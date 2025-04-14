from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from fastapi.middleware.cors import CORSMiddleware
from .. import models, schemas, crud
from .database import SessionLocal, engine, Base

Base.metadata.create_all(bind=engine)

app = FastAPI()

# Allow frontend access
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Or specify your frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.get("/todos", response_model=list[schemas.ToDoOut])
def read_todos(db: Session = Depends(get_db)):
    return crud.get_all_todos(db)

@app.post("/todos", response_model=schemas.ToDoOut)
def create(todo: schemas.ToDoCreate, db: Session = Depends(get_db)):
    return crud.create_todo(db, todo)

@app.get("/todos/{todo_id}", response_model=schemas.ToDoOut)
def read(todo_id: int, db: Session = Depends(get_db)):
    db_todo = crud.get_todo(db, todo_id)
    if not db_todo:
        raise HTTPException(status_code=404, detail="Todo not found")
    return db_todo

@app.put("/todos/{todo_id}", response_model=schemas.ToDoOut)
def update(todo_id: int, todo: schemas.ToDoUpdate, db: Session = Depends(get_db)):
    return crud.update_todo(db, todo_id, todo)

@app.delete("/todos/{todo_id}")
def delete(todo_id: int, db: Session = Depends(get_db)):
    crud.delete_todo(db, todo_id)
    return {"ok": True}

@app.get("/todos/filter/{completed}", response_model=list[schemas.ToDoOut])
def filter(completed: bool, db: Session = Depends(get_db)):
    return crud.filter_todos(db, completed)
