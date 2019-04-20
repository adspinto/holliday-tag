import React from 'react'
import Product from './Product'
import './tag.css'
import { api, dev_api } from '../config/config'

export default class Tag extends React.Component {
    constructor() {
        super();
        this.state = {
            data: '',
            active: false
        };
        this.getData = this.getData.bind(this)
        this.shouldRender = this.shouldRender.bind(this)
    }

    getData() {
        try {
            let getProduct = document.getElementById("listagemProdutos")
            let getProductListagem = document.getElementsByClassName("listagem")

            let productUl
            let testes
            let isHome
            if (getProduct) {
                console.log(getProduct, "pr")
                productUl = getProduct.getElementsByTagName("ul")
                testes = [...productUl].filter(q => q.dataset.produtosLinha !== undefined)
                isHome = true
            } else {
                console.log(getProductListagem)
                productUl = getProductListagem[0].getElementsByTagName("ul")
                testes = [...productUl]
                isHome = false
            }



            let newImage = new Image(100, 100)
            console.log(testes, "testes")
            // mudar a origem da imagem para a hospedagem da API
            newImage.src = "https://www.hollidaystore.com.br/hollidaystore/painel/painel/public/images/tag-lancamento-PNG-150x199px-1.png"

            let test_url = window.location.href
            let url = (api.LOCATION_URL == test_url ? api.TRINTA_READ : dev_api.DEV_TRINTA_READ);
            let arr_data = []

            fetch(url)
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
                                        console.log(ar)
                                        let idContainer
                                        if (isHome) {
                                            idContainer = ar.querySelector(".listagem-item").classList[1].slice(8)
                                        } else {
                                            let divCon = ar.getElementsByClassName("imagem-produto")[0]
                                            let imgCon = divCon.getElementsByTagName("img")[0]

                                            idContainer = imgCon.src.slice(52, 60)
                                        }


                                        arr_data.push(idContainer)
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
                            }, 10)
                        })
                    }

                })
                .catch(err => console.log("erro", err))

        } catch (err) {
            console.log("erro", err)
        }

    }

    shouldRender() {
        let test_url = window.location.href
        let url = (api.LOCATION_URL == test_url ? api.CHECK_ACTIVE : dev_api.DEV_CHECK_ACTIVE);
        var active = false
        return fetch(url)
            .then(response => response.json())
            .then(result => {
                let active = result[0]
                if (this._isMounted) {
                    if (active.active === "1") {
                        return true
                    } else {
                        return false
                    }
                }
            })
            .catch(err => console.log("error", err))
    }

    componentWillUnmount() {
        this._isMounted = false
    }
    componentDidMount() {
        this._isMounted = true
        this.shouldRender()
            .then(r => {
                if (r)
                    this.getData()
            })





    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    render() {
        return null
    }
}