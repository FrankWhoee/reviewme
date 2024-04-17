export function submitReview(email,title,text,stars) {
    fetch("http://localhost:8000/review", {
        method: "POST",
        body: JSON.stringify({
            email: email,
            title: title,
            text: text,
            rating: stars
        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    });
}

export async function fetchReviews(email=null) {
    let res = await fetch("http://localhost:8000/review" + (email != null ? "?email=" + email : ""), {
        method: "GET",
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    });
    return res.json()
}