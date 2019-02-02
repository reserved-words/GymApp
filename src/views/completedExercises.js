function (doc) {
    if (doc.type === 'completed-session'){
      for (var i in doc.exercises){
        var key = [ doc.exercises[i].type, doc.started ];
        emit(key, doc.exercises[i]);
      }
    }
  }