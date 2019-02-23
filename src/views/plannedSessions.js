function (doc) { 
    if (doc.type === "planned-session"){ 
      emit(doc.index, doc); 
    } 
  }