How to run (development):
1. npm install
2. npm run seed # create initial users and a sample request
3. npm start


Endpoints:
POST /api/requests
body: { studentEmail, courseCode, discipline, description, evidenceFiles }
GET /api/requests?status=&studentEmail=
GET /api/requests/:id
PATCH /api/requests/:id/status
body: { newStatus, decisionNote, performedByEmail }
GET /api/requests/:id/history


Notes:
- For brevity this example stores passwords as null. Integrate a proper auth and file storage for production.
- Use Postgres or another DB in production by changing ormconfig.ts.
- Replace `synchronize: true` with migrations in production.