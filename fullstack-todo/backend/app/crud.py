# app/crud.py
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from . import models, schemas, database

router = APIRouter()

def get_db():
    db = database.SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/todos", response_model=schemas.ToDoOut)
def create_todo(todo: schemas.ToDoCreate, db: Session = Depends(get_db)):
    db_todo = models.ToDo(**todo.dict())
    db.add(db_todo)
    db.commit()
    db.refresh(db_todo)
    return db_todo

@router.get("/todos", response_model=list[schemas.ToDoOut])
def get_all_todos(db: Session = Depends(get_db)):
    return db.query(models.ToDo).all()

@router.get("/todos/{todo_id}", response_model=schemas.ToDoOut)
def get_todo(todo_id: int, db: Session = Depends(get_db)):
    todo = db.query(models.ToDo).filter(models.ToDo.id == todo_id).first()
    if not todo:
        raise HTTPException(status_code=404, detail="Not found")
    return todo

@router.put("/todos/{todo_id}", response_model=schemas.ToDoOut)
def update_todo(todo_id: int, todo: schemas.ToDoUpdate, db: Session = Depends(get_db)):
    db_todo = db.query(models.ToDo).filter(models.ToDo.id == todo_id).first()
    if not db_todo:
        raise HTTPException(status_code=404, detail="ToDo not found")
    for key, value in todo.dict().items():
        setattr(db_todo, key, value)
    db.commit()
    db.refresh(db_todo)
    return db_todo

@router.delete("/todos/{todo_id}")
def delete_todo(todo_id: int, db: Session = Depends(get_db)):
    db_todo = db.query(models.ToDo).filter(models.ToDo.id == todo_id).first()
    if not db_todo:
        raise HTTPException(status_code=404, detail="ToDo not found")
    db.delete(db_todo)
    db.commit()
    return {"message": "ToDo deleted"}

@router.get("/todos/filter/{status}", response_model=list[schemas.ToDoOut])
def filter_todos(status: str, db: Session = Depends(get_db)):
    if status == "completed":
        return db.query(models.ToDo).filter(models.ToDo.completed == True).all()
    elif status == "pending":
        return db.query(models.ToDo).filter(models.ToDo.completed == False).all()
    return db.query(models.ToDo).all()

