CREATE TABLE IF NOT EXISTS citas(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    usuario_id INTEGER,
    nombre TEXT,
    fecha TEXT,
    hora TEXT,
    sintomas TEXT
);

-- INSERT or IGNORE INTO citas(usuario_id, nombre, fecha, hora, sintomas) VALUES (1, 'Mario', '13/05/2021','15:55',);
