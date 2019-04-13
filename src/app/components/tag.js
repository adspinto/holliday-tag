import React from 'react'
import Product from './Product'
import './tag.css'
import { api, dev_api } from '../config/config'

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

        let test_url = window.location.href
        let url = (api.LOCATION_URL == test_url ? api.TRINTA_READ : dev_api.DEV_TRINTA_READ);


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
                        }, 200)
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