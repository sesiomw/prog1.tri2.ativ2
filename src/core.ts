/**
 * @todo
 * known issues:
 * - getItems needs to await loadListFromDisk()
 */

// class Item_ { 
//   public title: string
//   constructor(title: string) {
//     this.title = title
//   }
// }

class Item {
  constructor(public title: string) { }
}

class TodoList {
  private items: Promise<Item[]>
  private filePath: string

  constructor(filePath: string) {
    this.filePath = filePath
    this.items = this.readListFromDisk()
  }

  private async saveListToDisk() {
    const file = Bun.file(this.filePath)
    const data = JSON.stringify(await this.items)
    await file.write(data)
  }

  private async readListFromDisk() {
    const file = Bun.file(this.filePath)
    // const text = await file.text()
    // const data = JSON.parse(text)
    const data = await file.json() as Item[]
    const items = data.map((v: any) => new Item(v.title))
    return items
  }

  /**
   * Adiciona um novo item na lista de item
   */
  async addItem(item: Item) {
    const items = await this.items
    if (!item)
      throw 'item não pode ser nulo ou indefinido'
    if (!item.title || !item.title.trim()) 
      throw 'item.title não pode ser nulo ou indefinido'
    items.push(item)
    await this.saveListToDisk()
    return items.length - 1
  }

  /**
   * Remove um item da lista de item pelo indice
   */
  async removeItem(index: number) {
    const items = await this.items
    if (!items[index]) 
      throw `Item de index ${index} não existe`
    items.splice(index, 1)
    await this.saveListToDisk()
  }

  /**
 * Atualiza um item da lista pelo índice
 */
async updateItem(index: number, newTitle: string) {
  const items = await this.items

  if (!newTitle || !newTitle.trim())
    throw 'newTitle não pode ser nulo ou vazio'

  if (index < 0 || index >= items.length)
    throw `Índice ${index} inválido. A lista tem ${items.length} item(s)`

  const item = items[index]
  if (!item)
    throw `Índice ${index} inválido. A lista tem ${items.length} item(s)`

  item.title = newTitle.trim()
  await this.saveListToDisk()
}

  /**
   * Retona uma cópia da lista de itens
   */
  async getItems() {
    const items = await this.items
    return Array.from(items)
  }
}

export default TodoList
export { Item, TodoList }