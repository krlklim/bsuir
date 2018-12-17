class DatabaseConnector {
    static get config() {
        return {
            databaseName: "database_lab8",
            version: "1.0",
            description: "database for lab 8",
            size: 2 * 1024 * 1024
        }
    }

    static get schema() {
        return {
            name: "classes",
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


    static get columns() {
        return Object.keys(DatabaseConnector.schema.columns).map((key) => DatabaseConnector.schema.columns[key])
    }

    static connect() {
        return openDatabase(
            DatabaseConnector.config.databaseName,
            DatabaseConnector.config.version,
            DatabaseConnector.config.description,
            DatabaseConnector.config.size
        )
    }

    static executeSql(query, values = [], successCallback = () => {}, errorCallback = (t, e) => { console.log(e) }) {
        DatabaseConnector.connect().transaction((transaction) =>
            transaction.executeSql(
                query,
                values,
                successCallback,
                errorCallback
            )
        );
    }

    static createTable() {
        DatabaseConnector.executeSql(`
            CREATE TABLE IF NOT EXISTS ${DatabaseConnector.schema.name} 
            (
                ${DatabaseConnector.columns.map((column) => (
                    `${column.name} ${column.type} ${column.attributes}`
                )).join(", ")}
            );
        `)
    }

    static insertQuery(columns, values) {
        DatabaseConnector.executeSql(`
            INSERT INTO ${DatabaseConnector.schema.name} 
            (${columns.join(',')}) VALUES (${Array(columns.length).fill('?').join(', ')})
        `, values);
    }

    static selectAllQuery(callback) {
        DatabaseConnector.executeSql(
            `SELECT * FROM ${DatabaseConnector.schema.name}`,
            [],
            ((transaction, result) => { callback(result) })
        )
    }

    static selectIdsQuery(callback) {
        DatabaseConnector.executeSql(
            `SELECT id FROM ${DatabaseConnector.schema.name}`,
            [],
            ((transaction, result) => { callback(result) })
        )
    }

    static deleteByIdQuery(id, callback) {
        DatabaseConnector.executeSql(
            `DELETE FROM ${DatabaseConnector.schema.name} WHERE id = ?`,
            [id],
            ((transaction, result) => { callback(result) })
        )
    }
}

class School {
    static create(studentsNumber, phone, teacher) {
        DatabaseConnector.insertQuery(
            [
                DatabaseConnector.schema.columns.studentsNumber.name,
                DatabaseConnector.schema.columns.phone.name,
                DatabaseConnector.schema.columns.teacher.name,
            ],
            [
               studentsNumber,
               phone,
               teacher
            ]
        );
    }

    static selectIds(callback) {
        DatabaseConnector.selectIdsQuery((results) => callback(results.rows));
    }

    static all(callback) {
        DatabaseConnector.selectAllQuery((results) => callback(results.rows));
    }

    static delete(id, callback = () => {}) {
        DatabaseConnector.deleteByIdQuery(id, callback);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    DatabaseConnector.createTable();
    School.selectIds(ids => populateSelect(ids));
    setupButtons();
});

setupButtons = () => {
    document.getElementById("addClassButton").onclick = () => handleAddClassButtonClicked();
    document.getElementById("showClassesButton").onclick = () => handleShowClassesButtonClicked();
    document.getElementById("clearFormButton").onclick = () => handleClearFormButtonClicked();
    document.getElementById("deleteClassButton").onclick = () => handleDeleteClassButtonClicked();
};

handleAddClassButtonClicked = () =>
    School.create(
        document.getElementById("studentsNumberInput").value,
        document.getElementById("phoneInput").value,
        document.getElementById("teacherInput").value
    );

handleClearFormButtonClicked = () => {
    document.getElementById("studentsNumberInput").value = "";
    document.getElementById("phoneInput").value = "";
    document.getElementById("teacherInput").value = "";
};

handleDeleteClassButtonClicked = () => {
    School.delete(document.getElementById("deletedClassId").value);
};

handleShowClassesButtonClicked = () => loadTable();
loadTable = () => School.all(classes => populateTable(classes));

populateTable = classes => {
    let template = document.getElementById("allClassesTemplate").innerHTML;
    Mustache.parse(template);
    document.getElementById("allClasses").innerHTML = Mustache.render(template, { classes: Array.from(classes) });
};

populateSelect = ids => {
    let template = document.getElementById("deleteClassInputTemplate").innerHTML;
    Mustache.parse(template);
    document.getElementById("deleteClassInput").innerHTML = Mustache.render(template, { classIds: Array.from(ids) });
};