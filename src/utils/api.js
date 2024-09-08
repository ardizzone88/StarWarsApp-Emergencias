const BASE_URL = 'https://swapi.dev/api/people/'

export const fetchData = async () => {
  let allCharacters = []
  let nextPage = BASE_URL

  try {
    while (nextPage) {
      const res = await fetch(nextPage)
      const data = await res.json()

      allCharacters = [...allCharacters, ...data.results]

      nextPage = data.next
    }
    return allCharacters
  } catch (error) {
    console.error('Error fetching data:', error)
  }
}
