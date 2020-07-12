
let typeorm = null

function getConnection() {
  if (typeorm) {
    return typeorm
  }

  return typeorm = {} // demo
}

export const connection = getConnection()
