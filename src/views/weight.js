function (doc) {
    if (doc.type === 'weight'){
      emit(doc.date, doc);
    }
  }