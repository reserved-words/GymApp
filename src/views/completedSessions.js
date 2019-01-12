function (doc) { 
    if (doc.type === "completed-session"){ 
        emit(doc.started, doc); 
    } 
}