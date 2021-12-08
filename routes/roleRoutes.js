// requirements
const db = require('../../db/connection');

// View All Roles 
SELECT roles.id, roles.title, roles.salary, departments.name
FROM roles 
LEFT JOIN departments ON roles.department_id = departments.id;

// Add Role
INSERT INTO roles (title, department_id, salary) VALUES ('?','?','?')

