function makeFriendsList(friends) {
  // ваш код...
  let ul = document.createElement("ul");

  for (friend of friends) {
    let li = document.createElement("li");
    li.textContent = `${friend.firstName} ${friend.lastName}`;
    ul.append(li);
  }

  return ul;
}
