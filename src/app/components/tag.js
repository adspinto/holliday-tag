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
        let getProduct = document.getElementById("listagemProdutos")
        let productUl = getProduct.getElementsByTagName("ul")
        let testes = [...productUl].filter(q => q.dataset.produtosLinha !== undefined)
        let newImage = new Image(100, 100)

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
                                    let idContainer = ar.querySelector(".listagem-item").classList[1].slice(8)
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
            .then((response) => {
                let get_url = (api.LOCATION_URL == test_url ? api.GET_PROMO : dev_api.DEV_GET_PROMO);
                fetch(get_url)
                    .then(response => response.json())
                    .then(result => {
                        let day = 24 * 60 * 60
                        let date = (new Date().getTime() / 1000) * 10
                        if (result.length > 0)
                            date = new Date(result[0].created).getTime() / 1000
                        let today = new Date().getTime() / 1000
                        let diferenca = Math.abs(Math.round(date - today))
                        if (diferenca >= day) {
                            setTimeout(() => {
                                console.log(arr_data)
                                let post_url = (api.LOCATION_URL == test_url ? api.UPDATE_PROMO : dev_api.DEV_UPDATE_PROMO);
                                let tr_url = (api.LOCATION_URL == test_url ? api.TR_PROMO : dev_api.DEV_TR_PROMO);
                                fetch(tr_url)
                                    .then(response => {
                                        arr_data.map(ar => {
                                            let objTest = { prod_promo: ar }
                                            fetch(post_url, {
                                                method: 'POST',
                                                body: JSON.stringify(objTest)
                                            })
                                                .catch(err => console.log("erro", err))

                                        })
                                    })
                                    .catch(err => console.log(err, "erro"))

                            }, 100)

                        }
                    })
                    .catch(err => console.log("erro", err))
            })
            .catch(err => console.log("erro", err))

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