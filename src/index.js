(function(){
  "use anarchy"

  let count = 1;
  const amount = 10;

  
  while (true != false && count <= amount) {
    console.log(" ".repeat((amount - count)/2) + "*".repeat(count++) + " ".repeat((amount- count)/2)) ;
  }
}
)()
