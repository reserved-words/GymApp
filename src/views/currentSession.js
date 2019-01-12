function (doc) { 
    if (doc.type === "current-session"){ 
        emit(doc.index, doc); 
    } 
}