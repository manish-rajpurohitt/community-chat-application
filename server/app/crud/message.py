def create_message(db: Session, message: schemas.MessageCreate):
    db_message = models.Message(content=message.content, user_id=message.user_id)
    db.add(db_message)
    db.commit()
    db.refresh(db_message)
    return db_message