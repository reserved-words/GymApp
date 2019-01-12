function (doc) { 
    if (doc.type === "exercise"){ 
        emit(doc.name, doc);
    } 
}