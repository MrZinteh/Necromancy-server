const db = require('../db')


exports.minionsGetAll = async (req, res, next) => {
  db.query('SELECT * FROM minions', (err, result) => {
    if (err) {
      res.status(500).send(err);
    }
    else if (result.rowCount === 0) {
      res.send(result);
    }
    else {
      res.send(result.rows);
    }
  });
}

exports.minionsGetByType = async (req, res, next) => {
  const type = req.params.type;
  db.query('SELECT * FROM minions WHERE minion_type=$1', [type], (err, result) => {
    if (err) {
      res.status(500).send(err);
    }
    else {
      res.send(result);
    }
  });
}

exports.minionsPostMinion = async (req, res, next) => {
  const type = req.query.type;
  let soul_id;
  let name;
  let used_souls;
  let possible_souls;
  db.query('SELECT soul_id from minions', (err, result) => {
    if (err) {
      console.log(err);
    }
    else {
      used_souls = result.rows;
      query = 'SELECT soul_id, soul_name from souls';
      if (used_souls.length > 0) {
        used_souls = used_souls.map(soul => soul.soul_id);
        query = 'SELECT soul_id, soul_name from souls WHERE soul_id NOT IN (' + used_souls.join(',') + ')'
      }
      db.query(query, (err, result) => {
        if (err) {
          console.log(err);
        }
        else {
          possible_souls = result.rows;
          if (possible_souls.length > 0) {
            const selectedSoul = possible_souls[Math.floor(Math.random() * possible_souls.length)];
            soul_id = selectedSoul.soul_id;
            name = selectedSoul.soul_name;

            db.query('INSERT INTO minions (soul_id, minion_name, minion_type, re_deceased) VALUES($1, $2, $3, $4)', [soul_id, name, type, false], (err, result) => {
              if (err) {
                res.status(403).send(err);
              } else {
                res.status(200).json({
                  soul_id: soul_id,
                  soul_name: name,
                  type: type
                });
              }
            });
          }
          else {
            res.status(200).send("No souls left");
          }
        }
      });
    }
  });
}

exports.minionsDeleteMinion = async (req, res, next) => {
  const name = req.query.name;
  db.query('DELETE FROM minions WHERE minion_name = $1', [name], (err, result) => {
    if (err) {
      console.log(err);
    }
    else {
      res.status(200).send(result);
    }
  });
}