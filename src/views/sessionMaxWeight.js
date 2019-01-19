function (doc) {
    if (doc.type === "completed-session"){
      for (i in doc.exercises){
        var exercise = doc.exercises[i];
        var date = doc.started;
        var key = [exercise.type, date];
        var value = 0;
        for (k in exercise.sets){
          var s = exercise.sets[k];
          if (s.weight > value){
            value = s.weight;
          }
        }
        emit(key, { date: date, value: value });
      }
    }
  }