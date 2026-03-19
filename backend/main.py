from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List
import sqlite3

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

def init_db():
    conn = sqlite3.connect('portfolio.db')
    cursor = conn.cursor()
    # ДОДАЛИ колонку display_order
    cursor.execute('''CREATE TABLE IF NOT EXISTS projects 
                      (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, desc TEXT, link TEXT, img TEXT, tech_stack TEXT, display_order INTEGER DEFAULT 0)''')
    cursor.execute('''CREATE TABLE IF NOT EXISTS reviews 
                      (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, text TEXT, rating INTEGER, created_at INTEGER)''')
    conn.commit()
    conn.close()

init_db()

# --- МОДЕЛІ ДАНИХ ---
class Project(BaseModel):
    title: str
    desc: str
    link: str
    img: str
    tech_stack: str

class Review(BaseModel):
    name: str
    text: str
    rating: int
    createdAt: int

# НОВА МОДЕЛЬ для сортування
class ProjectOrder(BaseModel):
    id: int
    display_order: int

# --- API ДЛЯ ПРОЄКТІВ ---
@app.get("/projects")
def get_projects():
    conn = sqlite3.connect('portfolio.db')
    cursor = conn.cursor()
    # Сортуємо спочатку за порядком, а потім за новизною
    cursor.execute("SELECT id, title, desc, link, img, tech_stack FROM projects ORDER BY display_order ASC, id DESC")
    projects = cursor.fetchall()
    conn.close()
    return [{"id": p[0], "title": p[1], "desc": p[2], "link": p[3], "img": p[4], "tech_stack": p[5]} for p in projects]

@app.post("/add-project")
def add_project(project: Project):
    conn = sqlite3.connect('portfolio.db')
    cursor = conn.cursor()
    cursor.execute("INSERT INTO projects (title, desc, link, img, tech_stack, display_order) VALUES (?, ?, ?, ?, ?, ?)", 
                   (project.title, project.desc, project.link, project.img, project.tech_stack, 0))
    conn.commit()
    conn.close()
    return {"message": "Проєкт успішно додано!"}

@app.delete("/projects/{project_id}")
def delete_project(project_id: int):
    conn = sqlite3.connect('portfolio.db')
    cursor = conn.cursor()
    cursor.execute("DELETE FROM projects WHERE id = ?", (project_id,))
    conn.commit()
    conn.close()
    return {"message": "Проєкт видалено!"}

# НОВИЙ ЕНДПОІНТ: Збереження нового порядку
@app.put("/projects/order")
def update_order(orders: List[ProjectOrder]):
    conn = sqlite3.connect('portfolio.db')
    cursor = conn.cursor()
    for order in orders:
        cursor.execute("UPDATE projects SET display_order = ? WHERE id = ?", (order.display_order, order.id))
    conn.commit()
    conn.close()
    return {"message": "Порядок оновлено!"}

# --- API ДЛЯ ВІДГУКІВ ---
@app.get("/reviews")
def get_reviews():
    conn = sqlite3.connect('portfolio.db')
    cursor = conn.cursor()
    cursor.execute("SELECT id, name, text, rating, created_at FROM reviews ORDER BY id DESC")
    reviews = cursor.fetchall()
    conn.close()
    return [{"id": r[0], "name": r[1], "text": r[2], "rating": r[3], "createdAt": r[4]} for r in reviews]

@app.post("/reviews")
def add_review(review: Review):
    conn = sqlite3.connect('portfolio.db')
    cursor = conn.cursor()
    cursor.execute("INSERT INTO reviews (name, text, rating, created_at) VALUES (?, ?, ?, ?)", 
                   (review.name, review.text, review.rating, review.createdAt))
    conn.commit()
    conn.close()
    return {"message": "Відгук додано!"}

@app.delete("/reviews/{review_id}")
def delete_review(review_id: int):
    conn = sqlite3.connect('portfolio.db')
    cursor = conn.cursor()
    cursor.execute("DELETE FROM reviews WHERE id = ?", (review_id,))
    conn.commit()
    conn.close()
    return {"message": "Відгук видалено!"}