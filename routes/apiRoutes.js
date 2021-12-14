const db = require("../models");

module.exports = function (app) {
  app.get("/api/workouts", (req, res) => {
    db.Workout.aggregate([{$addFields: {totalDuration: { $sum: "$exercises.duration" }}}])
      .then((workout) => {
        res.json(workout);
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  });
  app.get("/api/workouts/range", ({}, res) => {
    db.Workout.aggregate([{$addFields: {totalDuration: { $sum: "$exercises.duration" }}}])
      .then((workout) => {
        res.json(workout);
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  });
  app.post("/api/workouts/", (req, res) => {
    db.Workout.create(req.body)
      .then((workout) => {
        res.json(workout);
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  });
  app.put("/api/workouts/:id", (req, res) => {
    db.Workout.findByIdAndUpdate(
       req.params.id,
      { exercises: req.body },
      { runValidators: true}
    )
      .then((workout) => {
        res.json(workout);
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  });
};
