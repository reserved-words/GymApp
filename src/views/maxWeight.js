function (doc) {
  if (doc.type === "completed-session"){
    for (i in doc.exercises){
      var exercise = doc.exercises[i];
      var date = doc.started;
      var key = [exercise.type, date];
      var value = 0;
      for (k in exercise.sets){
        var s = exercise.sets[k];
        var w = exercise.addBodyWeight ? (s.weight + doc.bodyWeight) : s.weight;
        if (value === 0 || w > value){
          value = w;
        }
      }
      emit(key, { date: date, value: value });
    }
  }
}