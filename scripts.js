

$(document).ready(function() {
    $(window).bind('resize', setImageHeight);
    setImageHeight();

    var users = [];
    var currentUser = {};
    userAdd();

    $(".js-bonus-min").click(bonusMin);
    $(".js-bonus-plus").click(bonusPlus);
    $(".js-level-min").click(levelMin);
    $(".js-level-plus").click(levelPlus);

    $(".js-name-edit").click(userEdit);
    $(".js-name-save").click(userSave);

    $(".js-user-add").click(userAdd);

    function bonusMin() {
        currentUser.bonus--;
        updateUser(currentUser);
    }
    function bonusPlus() {
        currentUser.bonus++;
        updateUser(currentUser);
    }
    function levelMin() {
        currentUser.level--;
        updateUser(currentUser);
    }
    function levelPlus() {
        currentUser.level++;
        updateUser(currentUser);
    }

    function userEdit() {
        $(".js-name-input").val(currentUser.name);

        $("h1.name").addClass("hidden");
        $("h1.name-edit").removeClass("hidden");

        $(".js-name-input").focus();
    }
    function userSave() {
        currentUser.name = $(".js-name-input").val();
        updateUser(currentUser);

        $("h1.name").removeClass("hidden");
        $("h1.name-edit").addClass("hidden");
    }
    function userAdd() {
        newUser = {
            id : users.length,
            name : "Munchkin",
            level : 1,
            bonus : 0
        };
        users.push(newUser);
        currentUser = newUser;
        updateUser(currentUser);
        userEdit();
    }

    function changeCurrentUser(userId) {
        currentUser = users.filter(function (user) { return user.id === userId; })[0];
        updateUser(currentUser);
    }

    function updateUser(user) {
        $(".js-name").html(user.name);
        $(".js-level").html(user.level);
        $(".js-bonus").html(user.bonus);
        $(".js-points").html(user.level + user.bonus);

        $(".js-bonus-min").prop("disabled", user.bonus <= 0);
        $(".js-level-min").prop("disabled", user.level <= 1);
        showUserList(users);
    }

    function showUserList(userList) {
        var output = "";

        userList.sort(function (a, b) { return b.level - a.level; });
        userList.forEach(function (user) {
            output += "<tr data-id='" + user.id + "'";
            output += user === currentUser ? " class='self'" : "";
            output += ">"
            output += "<td>" + user.name + "</td>";
            output += "<td>" + user.level + "</td>";
            output += "<td>" + user.bonus + "</td>";
            output += "<td>" + (user.level + user.bonus) + "</td>";
            output += "</tr>";
        });
        $(".js-users").html(output);

        $(".js-users tr").click(function () { changeCurrentUser($(this).data("id")); });
    }

    function setImageHeight() {
        $('.board').css("max-height", $(window).height() - 50);
    }

});