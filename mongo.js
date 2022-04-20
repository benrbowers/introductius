conn = Mongo();
db = conn.getDB('Introductius');

db.intros.updateMany(
	{}, 
	{
		$set: { lastUsed: 0 },
	}
);