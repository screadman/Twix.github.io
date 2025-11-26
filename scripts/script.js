

function ajouterProduit(image, formulaire, cle, nom, prix) {
    identifiant = cle
   if(formulaire.quantite.value > 0){
    prix = formulaire.quantite.value * prix
    sessionStorage.setItem("image"+identifiant, image)
    sessionStorage.setItem("identifiant" + identifiant , identifiant)
    sessionStorage.setItem("nom"+ identifiant, nom)
    sessionStorage.setItem("prix" + identifiant, prix)
    sessionStorage.setItem("selection" + identifiant, formulaire.selection.value);
    sessionStorage.setItem("option" + identifiant, formulaire.produit.value);
    sessionStorage.setItem("quantite" + identifiant, formulaire.quantite.value);
   }
}
 
// fonction qui affiche le panier
function afficherPanier(){
     let indice = 1
     let identifiant = 1
     let total = 0 

     while(indice <= 22){
          if(parseInt(sessionStorage.getItem("quantite" + indice)) >0){
               facture(identifiant)
               total = total + parseInt(sessionStorage.getItem("quantite" + indice)) * sessionStorage.getItem("prix" + indice)
          }
          identifiant++
          indice++
          
     }

     // afficher le total
     document.getElementById("prixTotal").innerHTML = total + " $"

     // reduction de 10%
     document.getElementById("reduction").innerHTML = (total*10)/100 + " $"

     // total à payer
     document.getElementById("totalPayer").innerHTML = total - ((total*10)/100) + " $"

}


function facture(identifiant){
    // création du grid
    let grillePanier = document.createElement("div");
    grillePanier.setAttribute("class", "row");

  

    // colonnes
    let divImage = document.createElement("div");
    divImage.setAttribute("class", "col-2");
    let divTexte = document.createElement("div");
    divTexte.setAttribute("class", "col-5");
    let divSelection = document.createElement("div")
    divSelection.setAttribute("class", "col-2")
    let divQuantite = document.createElement("div");
    divQuantite.setAttribute("class", "col-1");
    let divOption = document.createElement("div");
    divOption.setAttribute("class", "col-2");

    
    // image du produit
    let image = document.createElement("img");
    image.setAttribute("src", sessionStorage.getItem("image" + identifiant));
    image.setAttribute("class", "img-fluid w-100");
    image.setAttribute("alt", "image" );
    divImage.appendChild(image);

    // texte du produit
    let titreProduit = document.createElement("h2");
    titreProduit.innerText = sessionStorage.getItem("nom" + identifiant);
    let prixProduit = document.createElement("p");
    prixProduit.innerText = sessionStorage.getItem("prix" + identifiant) + " $";
    titreProduit.appendChild(prixProduit);
    let supprimer = document.createElement("button");
    supprimer.setAttribute("type", "button");
    supprimer.setAttribute("class", "btn btn-primary");
    supprimer.setAttribute("onclick", "supprimerElement(" + identifiant + ")")
    supprimer.setAttribute("style", "--bs-btn-padding-y: .25rem; --bs-btn-padding-x: .5rem; --bs-btn-font-size: .75rem;");
    let icone = document.createElement("i")
    icone.setAttribute("class", "fa-regular fa-trash-can")
    supprimer.innerHTML = "supprimer| ";
    supprimer.appendChild(icone)
    titreProduit.appendChild(supprimer);
    divTexte.appendChild(titreProduit);


    divSelection.innerText = "Selection: " + sessionStorage.getItem("selection" + identifiant)
    divQuantite.innerText = "Qté: " + sessionStorage.getItem("quantite" + identifiant);
    divOption.innerText = "option: " + sessionStorage.getItem("option" + identifiant);

    /*Cacher le titre Panier vide*/
    document.getElementById("titrePanierVide").classList.add("d-none");
    /*Afficher le bouton pour vider le panier*/
    document.getElementById("boutonEffacer").classList.remove("d-none");
    document.getElementById("panier").style.backgroundColor = " rgb(194, 197, 200)"
    document.getElementById("total").classList.remove("d-none")

    grillePanier.appendChild(divImage);
    grillePanier.appendChild(divTexte);
    grillePanier.appendChild(divQuantite);
    grillePanier.appendChild(divSelection)
    grillePanier.appendChild(divOption);

    

    document.getElementById("panier").appendChild(grillePanier);  
    
   
}

// afficher le nombre de produits à côté du panier
function compteur(){
     let compteur=0

     let indice = 1
     let identifiant = 1

     while(indice <= 22){
          if(parseInt(sessionStorage.getItem("quantite" + indice)) > 0){
               compteur++
          }
          identifiant++
          indice++
     }

    sessionStorage.setItem("compteur", compteur)
    document.getElementById("navNombre").innerText = sessionStorage.getItem("compteur")

}

// supprimer un élément du panier
function supprimerElement(produit){
     sessionStorage.removeItem("quantite"+ produit)
     location.reload()

}

// vider le panier
function viderPanier(){
     sessionStorage.clear()
     location.reload()

}
