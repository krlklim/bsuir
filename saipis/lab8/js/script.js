class DatabaseConnector {
    static get config() {
        return {
            version: "1.0",
            description: "database for lab 8",
            size: 2 * 1024 * 1024
        }
    }

    constructor(databaseName) {
        this.connection = openDatabase(
            databaseName,
            DatabaseConnector.config.version,
            DatabaseConnector.config.description,
            DatabaseConnector.config.size
        )
    }


    executeSql(query, values = [], successCallback = () => {}, errorCallback = (t, e) => { console.log(e) }) {
        this.connection.transaction((transaction) =>
            transaction.executeSql(
                query,
                values,
                successCallback,
                errorCallback
            )
        );
    }

    createTable(table, columns) {
        this.executeSql(`
            CREATE TABLE IF NOT EXISTS ${table} 
            (
                ${columns.map((column) => (
                    `${column.name} ${column.type} ${column.attributes}`
                )).join(", ")}
            );
        `)
    }

    insertQuery(table, columns, values) {
        this.executeSql(`
            INSERT INTO ${table} 
            (${columns.join(',')}) VALUES (${Array(columns.length).fill('?').join(', ')})
        `, values);
    }

    selectAllQuery(table, callback) {
        this.executeSql(
            `SELECT * FROM ${table}`,
            [],
            ((transaction, result) => { callback(result) })
        )
    }

    selectIdsQuery(table, callback) {
        this.executeSql(
            `SELECT id FROM ${table}`,
            [],
            ((transaction, result) => { callback(result) })
        )
    }

    deleteByIdQuery(table, id, callback) {
        this.executeSql(
            `DELETE FROM ${table} WHERE id = ?`,
            [id],
            ((transaction, result) => { callback(result) })
        )
    }
}

class ClassesManager {
    static get schema() {
        return {
            table: "classes",
            columns: {
                id: {
                    name: "id",
                    type: "INTEGER",
                    attributes: "PRIMARY KEY"
                },
                studentsNumber: {
                    name: "studentsNumber",
                    type: "INTEGER",
                    attributes: ""
                },
                phone: {
                    name: "phone",
                    type: "VARCHAR",
                    attributes: ""
                },
                teacher: {
                    name: "teacher",
                    type: "VARCHAR",
                    attributes: ""
                }
            }
        }
    }

    constructor() {
        this.connector = new DatabaseConnector('schools');
    }

    createTable() {
        this.connector.createTable(
            ClassesManager.schema.table, Object.keys(ClassesManager.schema.columns).map(key =>
                ClassesManager.schema.columns[key]
            )
        );
    }

    create(studentsNumber, phone, teacher) {
        this.connector.insertQuery(
            ClassesManager.schema.table,
            [
                ClassesManager.schema.columns.studentsNumber.name,
                ClassesManager.schema.columns.phone.name,
                ClassesManager.schema.columns.teacher.name,
            ],
            [
                studentsNumber,
                phone,
                teacher
            ]
        );
    }

    selectIds(callback) {
        this.connector.selectIdsQuery(ClassesManager.schema.table, (results) => callback(results.rows));
    }

    all(callback) {
        this.connector.selectAllQuery(ClassesManager.schema.table, (results) => callback(results.rows));
    }

    delete(id, callback = () => {}) {
        this.connector.deleteByIdQuery(ClassesManager.schema.table, id, callback);
    }

    maxClasses(callback = () => {}) {
        this.connector.executeSql(`
            SELECT 
                ${ClassesManager.schema.columns.teacher.name}
            FROM ${ClassesManager.schema.table}
            INNER JOIN (
                SELECT MAX(${ClassesManager.schema.columns.studentsNumber.name}) AS number
                FROM ${ClassesManager.schema.table}
            ) maxStudents
            ON ${ClassesManager.schema.table}.${ClassesManager.schema.columns.studentsNumber.name} = maxStudents.number`,
            [],
            ((transaction, result) => {
                callback(result.rows)
            })
        );
    }
}

class EventsManager {
    constructor(classesManager) {
        this.classesManager = classesManager;
        this.reloadSelect();

        this.handleAddClassButtonClicked = this.handleAddClassButtonClicked.bind(this);
        this.handleShowClassesButtonClicked = this.handleShowClassesButtonClicked.bind(this);
        this.handleClearFormButtonClicked = this.handleClearFormButtonClicked.bind(this);
        this.handleDeleteClassButtonClicked = this.handleDeleteClassButtonClicked.bind(this);
        this.handleShowMaxTeachersButton = this.handleShowMaxTeachersButton.bind(this);
    }

    reloadTable() {
        this.classesManager.all(classes => this.populateTable(classes));
        this.reloadSelect();
    }

    reloadSelect() {
        this.classesManager.selectIds(ids => this.populateSelect(ids));
    }

    setupButtons() {
        document.getElementById("addClassButton").onclick = this.handleAddClassButtonClicked;
        document.getElementById("showClassesButton").onclick = this.handleShowClassesButtonClicked;
        document.getElementById("clearFormButton").onclick = this.handleClearFormButtonClicked;
        document.getElementById("deleteClassButton").onclick = this.handleDeleteClassButtonClicked;
        document.getElementById("showMaxTeachersButton").onclick = this.handleShowMaxTeachersButton;
    };

    handleAddClassButtonClicked() {
        this.classesManager.create(
            document.getElementById("studentsNumberInput").value,
            document.getElementById("phoneInput").value,
            document.getElementById("teacherInput").value
        );
    }

    handleClearFormButtonClicked() {
        document.getElementById("studentsNumberInput").value = "";
        document.getElementById("phoneInput").value = "";
        document.getElementById("teacherInput").value = "";
    };

    handleDeleteClassButtonClicked() {
        this.classesManager.delete(document.getElementById("deletedClassId").value);
    };

    handleShowClassesButtonClicked() {
        this.reloadTable();
    }

    handleShowMaxTeachersButton() {
        this.classesManager.maxClasses(classes => this.populateMaxClasses(classes));
    }

    populateTable(classes) {
        let template = document.getElementById("allClassesTemplate").innerHTML;
        Mustache.parse(template);
        document.getElementById("allClasses").innerHTML = Mustache.render(template, { classes: Array.from(classes) });
    };

    populateSelect(ids) {
        let template = document.getElementById("deleteClassInputTemplate").innerHTML;
        Mustache.parse(template);
        document.getElementById("deleteClassInput").innerHTML = Mustache.render(template, { classIds: Array.from(ids) });
    };

    populateMaxClasses(classes) {
        let template = document.getElementById("maxClassesTemplate").innerHTML;
        Mustache.parse(template);
        document.getElementById("maxTeachers").innerHTML = Mustache.render(template, { classes: Array.from(classes) });
    }
}

document.addEventListener("DOMContentLoaded", () => {
    let classesManager = new ClassesManager();
    classesManager.createTable();
    let eventsManager = new EventsManager(classesManager);
    eventsManager.setupButtons();
});
