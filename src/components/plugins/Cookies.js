export function CookiesGet() {
  let Name = 'history'
  let a = JSON.parse(localStorage.getItem(Name));
  if (!a) {
    return [];
  } else {
    return a;
  }
}

export function CookiesSet(_, value) {
  let Name = 'history'
  let a = JSON.parse(localStorage.getItem(Name));
  if (!a) {
    a = [value];
    localStorage.setItem(Name, JSON.stringify(a));
  } else {
    a.shift(value);
    localStorage.setItem(Name, JSON.stringify(a))
  }
}