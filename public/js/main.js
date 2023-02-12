function getStream(category) {
        var xhr = new XMLHttpRequest();

        xhr.open("POST", "/api/getStream");
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.onload = function() {
                if (xhr.status === 200) {
                        var res = JSON.parse(xhr.responseText);
                        if (res.success == "true") {
                                var listDiv = document.getElementById("updateDiv");
                                listDiv.innerHTML = res.template;
                                        window.history.pushState({}, "page", "/#/" + category);
                                window.scrollTo(0, 0);
                                // listDiv.insertAdjacentHTML("beforeend", res.template);
                        } else {
                                // handle error
                        }
                }

        };

        // For now, all we're sending is a username and password, but we may start
        // asking for email or mobile number at some point.
        xhr.send(JSON.stringify({
                category: category
        }));
        // var sb = document.getElementById("sidebar").offsetWidth;
        // var s = document.getElementById("sizer");
        // w = (window.innerWidth - (sb)) + "px";
        // mL = (sb) + "px";
        // s.style.width = w;
        // s.style.marginLeft = mL;
}

function like(trackID, isLoggedIn) {
        if (isLoggedIn == "false") {
                showAuth();
        } else {
                var xhr = new XMLHttpRequest();

                xhr.open("POST", "/api/like");
                xhr.setRequestHeader("Content-Type", "application/json");
                xhr.onload = function() {
                        if (xhr.status === 200) {
                                var res = JSON.parse(xhr.responseText);
                                if (res.success == "false") {
                                        // If we aren't successful we display an error.
                                        document.getElementById("errorField").innerHTML = res.error;
                                } else if (res.isLiked == "true") {
                                        document.getElementById("heart_" + trackID).style.backgroundImage = "url(/public/assets/heart_red.svg)";
                                } else if (res.isLiked == "false") {
                                        document.getElementById("heart_" + trackID).style.backgroundImage = "url(/public/assets/heart_black.svg)";
                                } else {
                                        // handle error
                                        console.log("error");
                                }
                        }
                };

                // For now, all we're sending is a username and password, but we may start
                // asking for email or mobile number at some point.
                xhr.send(JSON.stringify({
                                        id: trackID
                }));

        }
}
