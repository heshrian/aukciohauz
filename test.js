function test() {
  if (1 === 1) {
    console.log('yes')
  } else {
    throw new Error
  }
}

test()