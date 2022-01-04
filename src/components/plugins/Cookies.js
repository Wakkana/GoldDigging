
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
  a.push(value);
  a = [...new Set(a)]
  console.log(a);
  localStorage.setItem(Name, JSON.stringify(a))
}