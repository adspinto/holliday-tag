import React from 'react'
import Product from './Product'
import './tag.css'
export default class Tag extends React.Component {
    constructor() {
        super();
        this.state = {
            data: ''
        };
        this.getData = this.getData.bind(this)
    }

    async getData() {

        let getProduct = document.getElementById("listagemProdutos")
        let productUl = getProduct.getElementsByTagName("ul")
        let testes = [...productUl].filter(q => q.dataset.produtosLinha !== undefined)
        let newImage = new Image(100, 100)
        newImage.src = "https://www.hollidaystore.com.br/hollidaystore/painel/painel/public/images/tag-lancamento-PNG-150x199px-1.png"
        let url = 'https://www.hollidaystore.com.br/hollidaystore/painel/api/tag/read_api_holliday.php'
        await fetch(url)
            .then(response => {
                return response.json()
            })
            .then(results => {
                if (this._isMounted) {
                    this.setState({ data: results }, () => {
                        var data = this.state.data
                        setTimeout(() => {
                            testes.map(ul => {
                                let arr = []
                                let children = ul.children
                                let myObj = Object.values(children).forEach(e => {
                                    arr.push(e)
                                })

                                arr.map((ar) => {
                                    let idContainer = ar.querySelector(".listagem-item").classList[1].slice(8)
                                    let testContainer = ar.querySelector(".imagem-produto")
                                    let testeDivCreation = document.createElement("img");
                                    testeDivCreation.src = newImage.src
                                    testeDivCreation.classList.add("tag-image")
                                    for (let i = 0; i < data.length; i++) {
                                        if (data[i].prod_trinta_dias === idContainer) {

                                            testContainer.appendChild(testeDivCreation)
                                        }

                                    }

                                })
                            })
                        }, 500)
                    })
                }

            })
            .catch(err => console.log("erro", err))
    }

    componentWillUnmount() {
        this._isMounted = false
    }
    componentDidMount() {
        this._isMounted = true
        this.getData()

    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    render() {
        return null
    }
}