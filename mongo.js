conn = Mongo();
db = conn.getDB('Introductius');

db.intros.insertOne({
	user: '469945284319903754',
	url: 'https://www.youtube.com/watch?v=CelgqNnv0wU',
	start: 0,
	duration: 6,
})