import { Recipe } from "../types/common"

export const saveMapToLocalStorage = (key: string, newMap: Map<number, Recipe>): void => {
  const existingMap = getMapFromLocalStorage(key)
  const combinedMap = new Map<number, Recipe>([...existingMap, ...newMap])
  const mapString = JSON.stringify(Array.from(combinedMap.entries()))
  localStorage.setItem(key, mapString)
}

export const getMapFromLocalStorage = (key: string): Map<number, Recipe> => {
  const mapString = localStorage.getItem(key)
  return mapString ? new Map<number, Recipe>(JSON.parse(mapString)) : new Map<number, Recipe>()
}

export const removeRecipeByIdLocalStorage = (key: string, id: number) => {
  try {
    const mapData = getMapFromLocalStorage(key)
    mapData.delete(id)
    localStorage.setItem(key, JSON.stringify(Array.from(mapData.entries())))
  } catch (error) {
    console.log(error)
  }
}
