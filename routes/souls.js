const db = require('../db')


exports.soulsGetAll = async (req, res, next) => {
    db.query('SELECT * FROM souls', (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send(err);
      }
      else {
        res.send(result);
      }
    });
    // db.end();
  }

exports.soulsPostSoul = async (req, res, next) => {
  const name = req.query.name;
  db.query('INSERT INTO souls (soul_name) VALUES($1)', [name], (err, result) => {
    if (err) {
      res.status(403).send(err);
    } else {
      res.status(200).json({soul_name: name});
    }
  });
  db.end();
}

exports.soulsCountSouls = async (req, res, next) => {
  db.query('SELECT COUNT(*) FROM souls', (err, result) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).json(result.rows[0]);
    }
  });
  db.end();
}

exports.soulsDeleteSouls = async (req, res, next) => {
  const name = req.query.name;
  let used_souls;
  db.query('SELECT soul_id from minions', (err, result) => {
    if (err) {
      console.log(err);
    }
    else {
      used_souls = result.rows;
      if (used_souls.length > 0) {
        used_souls = used_souls.map(soul => soul.soul_id);
      }
      query = 'DELETE FROM souls WHERE soul_name = $1 AND soul_id NOT IN (' + used_souls.join(',') + ')';
      db.query(query, [name], (err, result) => {
        if (err) {
          console.log(err);
        }
        else {
          res.status(200).send(result);
        }
      });
    }
  });
  db.end();
}

exports.soulsDeleteRandomSouls = async (req, res, next) => {
  const amount = req.params.amount;
  let used_souls;
  db.query('SELECT soul_id from minions', (err, result) => {
    if (err) {
      console.log(err);
    }
    else {
      used_souls = result.rows;
      if (used_souls.length > 0) {
        used_souls = used_souls.map(soul => soul.soul_id);
      }
      select_query = 'SELECT soul_id, soul_name FROM souls WHERE soul_id NOT IN (' + used_souls.join(',') + ')';
      db.query(select_query, (err, result) => {
        if (err) {
          console.log(err);
        }
        else {
          const pouched_souls = result.rows;
          let pouched_soul_names = [];
          if (pouched_souls.length > 0) {
            pouched_soul_names = pouched_souls.map(soul => soul.soul_name);
          }
          for(let i = 0; i<amount; i++) {
            const random_index = Math.floor(Math.random() * pouched_soul_names.length);
            const random_pouched_soul = pouched_soul_names[random_index];
            db.query('DELETE FROM souls WHERE soul_name = $1', [random_pouched_soul], (err, result) => {
              if (err) {
                console.log(err);
              }
            });
            pouched_soul_names.splice(random_index, 1);
          }
          res.status(200).send();
        }
      });
    }
  });
  db.end();
}