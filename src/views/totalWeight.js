function (doc) {
  if (doc.type === "completed-session"){
    for (i in doc.exercises){
      var exercise = doc.exercises[i];
      var date = doc.started;
      var key = [exercise.type,date];
      var value = 0;
      for (j in exercise.warmup){
         var s = exercise.warmup[j];
         value = value + s.reps * s.weight * s.quantity;
      }
      for (k in exercise.sets){
        var s = exercise.sets[k];
        var w = exercise.addBodyWeight ? (s.weight + doc.bodyWeight) : s.weight;
        value = value + s.reps * w * s.quantity;
      }
      emit(key, { date: date, value: value });
    }
  }
}