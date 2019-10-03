function test(i) {
  if (i === 1) {
    console.log('yes')
  } else {
    throw new Error
  }
}



test(1)
