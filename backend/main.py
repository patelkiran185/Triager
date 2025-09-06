from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from libsql_client import create_client
from fastapi.middleware.cors import CORSMiddleware

from fastapi import Query

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

DATABASE_URL = "https://customers-kiranpatel.aws-ap-northeast-1.turso.io"
DATABASE_TOKEN = "eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJpYXQiOjE3NTcxNDgzNTAsImlkIjoiNjllYjM0MmMtOWY5ZS00MWIyLTg0MTctMDZjYWI0YTNkNTczIiwicmlkIjoiOWI4ZmUxZTctZjFmMi00OTQwLTg5NTEtYjgxNjMzYmUyNjJjIn0.HJ77N1Kbh9kdVdE857l1Eu3M4JsPkHCVcQQ2UwGIZBUk1F6wipJlNN0oycnSaJBE1Xr7znFJwsRo8GD0C2G_DQ"

client = create_client(DATABASE_URL, auth_token=DATABASE_TOKEN)

class Ticket(BaseModel):
    ticket_id: int | None = None
    ticket_name: str
    title: str
    description: str
    customer_name: str
    customer_email: str
    status: str | None = None
    priority: str | None = None

@app.post("/tickets/", response_model=Ticket)
async def create_ticket(ticket: Ticket):
    result = await client.execute(
        "INSERT INTO customers (ticket_name, title, description, customer_name, customer_email, status, priority) VALUES (?, ?, ?, ?, ?, ?, ?)",
        [ticket.ticket_name, ticket.title, ticket.description, ticket.customer_name, ticket.customer_email, ticket.status, ticket.priority]
    )
    ticket_id = result.last_insert_rowid
    return {**ticket.dict(), "ticket_id": ticket_id}



@app.get("/tickets/", response_model=list[Ticket])
async def read_tickets(pending: bool = Query(False)):
    # Build query based on pending param
    query = "SELECT * FROM customers"
    if pending:
        query += " WHERE status = 'pending'"
    result = await client.execute(query)
    # result is a ResultSet object; get rows and columns
    rows = result.rows
    columns = result.columns
    tickets = [Ticket(**dict(zip(columns, row))) for row in rows]
    return tickets

@app.put("/tickets/{ticket_id}", response_model=Ticket)
async def update_ticket(ticket_id: int, ticket: Ticket):
    await client.execute(
        "UPDATE customers SET ticket_name=?, title=?, description=?, customer_name=?, customer_email=?, status=?, priority=? WHERE ticket_id=?",
        [ticket.ticket_name, ticket.title, ticket.description, ticket.customer_name, ticket.customer_email, ticket.status, ticket.priority, ticket_id]
    )
    return {**ticket.dict(), "ticket_id": ticket_id}

@app.delete("/tickets/{ticket_id}")
async def delete_ticket(ticket_id: int):
    await client.execute("DELETE FROM customers WHERE ticket_id=?", [ticket_id])
    return {"message": "Ticket deleted"}