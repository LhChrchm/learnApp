
const logIn = function () {
    //debugger
    const username = $("#username").val()
    let password = $("#password").val()
    if (password) {
        $.post('/login', { username }, function (u) {
            user = new User(username)
            renderer.render(LOGIN_TEMPLATE, { isLoggedIn: true, username }, LOGIN_AREA)
            let data = "" // because we need data to use handlebars
            renderer.render(MAIN_TEMPLATE, data, MAIN_AREA)
            renderer.render(RESULTS_TEMPLATE, data, RESULTS_AREA)
            renderer.render(DB_TEMPLATE, data, DB_AREA)

        })
    } else {
        alert("Please enter your password.")
    }
}

const logOut = function () {
    user = undefined
    renderer.render(LOGIN_TEMPLATE, { isLoggedIn: false }, LOGIN_AREA)
    renderer.clear(MAIN_AREA)
    renderer.clear(RESULTS_AREA)
    renderer.clear(DB_AREA)
}

const search = function () {
    let skill = $("#skillInput").val()
    user.search(skill).then(() => console.log("done"))
}

renderer.render(LOGIN_TEMPLATE, { isLoggedIn: false }, LOGIN_AREA)
$(".main-area").on("click", "#searchButton", search)

//------------ Read more feature -------------

const showMore = function () {
    const podcastDiv = $(this).closest(".podcast")
    const allDescription = $(this).closest(".podcast").find(".podcastDescription").data("id")
    let words = allDescription.split(" ")
    let restOfDesc = words.splice(50).join(" ")
    $(this).empty()
    podcastDiv.append(`<span class= expandedDesc >${restOfDesc}</span> <span class="readLess"> <button class="descButton">Read Less </button></span>`)
}

const showLess = function () {
    const expandedDesc = $(this).closest(".podcast").find(".expandedDesc")
    expandedDesc.empty()
}

$("body").on("click", ".showMore", showMore)
$("body").on("click", ".readLess", showLess)

//Handlebar custom HELPER 
Handlebars.registerHelper('shortDesc', function (description) {
    let words = description.split(" ")
    let fewWords = words.splice(0,50).join(" ")
    if (words.length > 50)
        return fewWords;
});

// ========= save and remove buttons

const saveToDB = function(){
    let episodeName = $(this).closest(".podcast").find(".episodeTitle").text()
    user.saveToDB(episodeName)
}

const removeFromDB = function(){
    let episodeName = $(this).closest(".savedPodcast").find(".savedEpisodeTitle").text()
    user.removeFromDB(episodeName)
}


$("body").on("click", ".savePodcast", saveToDB)
$("body").on("click", ".removePodcast", removeFromDB)

