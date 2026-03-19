from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List
import psycopg2

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Твоє посилання на базу даних PostgreSQL (Сейф!)
DB_URL = "postgresql://portfolio_19hy_user:DQhGgsTcGc5gJ1mHvzFzDLKzEFcrDAFQ@dpg-d6u4hvggjchc73cq75m0-a.oregon-postgres.render.com/portfolio_19hy"

def get_db_connection():
    return psycopg2.connect(DB_URL)

def init_db():
    conn = get_db_connection()
    cursor = conn.cursor()
    # Створюємо таблиці у PostgreSQL
    cursor.execute('''CREATE TABLE IF NOT EXISTS projects 
                      (id SERIAL PRIMARY KEY, title TEXT, "desc" TEXT, link TEXT, img TEXT, tech_stack TEXT, display_order INTEGER DEFAULT 0)''')
    cursor.execute('''CREATE TABLE IF NOT EXISTS reviews 
                      (id SERIAL PRIMARY KEY, name TEXT, text TEXT, rating INTEGER, created_at BIGINT)''')
    conn.commit()
    cursor.close()
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

class ProjectOrder(BaseModel):
    id: int
    display_order: int

# --- API ДЛЯ ПРОЄКТІВ ---
@app.get("/projects")
def get_projects():
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute('SELECT id, title, "desc", link, img, tech_stack FROM projects ORDER BY display_order ASC, id DESC')
    projects = cursor.fetchall()
    cursor.close()
    conn.close()
    return [{"id": p[0], "title": p[1], "desc": p[2], "link": p[3], "img": p[4], "tech_stack": p[5]} for p in projects]

@app.post("/add-project")
def add_project(project: Project):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute('INSERT INTO projects (title, "desc", link, img, tech_stack, display_order) VALUES (%s, %s, %s, %s, %s, %s)', 
                   (project.title, project.desc, project.link, project.img, project.tech_stack, 0))
    conn.commit()
    cursor.close()
    conn.close()
    return {"message": "Проєкт успішно додано!"}

@app.delete("/projects/{project_id}")
def delete_project(project_id: int):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("DELETE FROM projects WHERE id = %s", (project_id,))
    conn.commit()
    cursor.close()
    conn.close()
    return {"message": "Проєкт видалено!"}

@app.put("/projects/order")
def update_order(orders: List[ProjectOrder]):
    conn = get_db_connection()
    cursor = conn.cursor()
    for order in orders:
        cursor.execute("UPDATE projects SET display_order = %s WHERE id = %s", (order.display_order, order.id))
    conn.commit()
    cursor.close()
    conn.close()
    return {"message": "Порядок оновлено!"}

# --- API ДЛЯ ВІДГУКІВ ---
@app.get("/reviews")
def get_reviews():
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT id, name, text, rating, created_at FROM reviews ORDER BY id DESC")
    reviews = cursor.fetchall()
    cursor.close()
    conn.close()
    return [{"id": r[0], "name": r[1], "text": r[2], "rating": r[3], "createdAt": r[4]} for r in reviews]

@app.post("/reviews")
def add_review(review: Review):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("INSERT INTO reviews (name, text, rating, created_at) VALUES (%s, %s, %s, %s)", 
                   (review.name, review.text, review.rating, review.createdAt))
    conn.commit()
    cursor.close()
    conn.close()
    return {"message": "Відгук додано!"}

@app.delete("/reviews/{review_id}")
def delete_review(review_id: int):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("DELETE FROM reviews WHERE id = %s", (review_id,))
    conn.commit()
    cursor.close()
    conn.close()
    return {"message": "Відгук видалено!"}