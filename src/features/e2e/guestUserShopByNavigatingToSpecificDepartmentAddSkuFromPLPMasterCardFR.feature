Feature: Guest User Shops By Department Add Sku Checkout With Master Card In French

  Background: User launches url
    Given the user launches the url

  @e2e @regressionTest @bopis @guestUser @masterCard @mCycle @lowStock
  Scenario Outline: Guest user should able to shop by department add sku checkout with mastercard in french
    Then the user enters text "7001" in textbox with placeholder "Postal Code, City, or Store Number"
    Then the user clicks on the "search" icon at index "2"
    Then the user waits for text "SCARBOROUGH #7001" to be visible
    Then the user click on "Select"
    Then the user click on "Français"
    Then the user click on "Magasiner par rayon"
    Then the user click on "Salle de bain"
    Then the user click on "Cabines de douche et portes de cabine de douche"
    Then the user click on "Portes de cabine de douche"
    Then the user presses keyboard key "Escape"
    Then the user waits for text "En stock aujourd’hui" to be visible
    Then the user clicks on the checkbox "En stock aujourd"
    Then the user waits until the spinner is no longer visible
    Then the user click on "Livraison et ramassage"
    Then the user clicks on text "Ramassage gratuit en magasin" at index "1"
    Then the user waits until the spinner is no longer visible
    Then the user click on "Pertinence"
    Then the user click on "Meilleure cote"
    Then the user waits until the spinner is no longer visible
    Then the user clicks on text "Nº d'article # " at index "1"
    Then the user refresh the page
    Then the user waits for text "Ajouter au panier" to be visible
    Then the user click on " Ramassage en magasin "
    Then the user enters value "<noOfProductabove10>" in dropdown "Qté"
    Then the user enters text "<maxQuantity>" in the textbox "Qté"
    Then the user add product to cart
    Then the user validates if "Sélectionnez un autre mode de livraison/ramassage pour vérifier la disponibilité des stocks." text is visible
    Then the user click on "Afficher le panier"
    Then the user waits for text "Mon Panier: " to be visible
    Then the user clicks on text " Sélectionner une date à la caisse " at index "1"
    Then the user waits for text " Ramassage en magasin : " to be visible
    Then the user enters text "<maxQuantity>" in the textbox "Qté"
    Then the user presses keyboard key "Enter"
    Then the user validates if the text "La quantité a été réduite en raison du faible niveau du stock." is visible at index "1"
    Then the user click on "MAAX"
    Then the user waits for text "Ajouter au panier" to be visible
    Then the user click on " Ramassage en magasin "
    Then the user enters text "<maxQuantity>" in the textbox "Qté"
    Then the user click on "Ajouter au panier"
    Then the user validates if "Cet article est temporairement en rupture de stock et n’a pas pu être ajouté à votre panier." text is visible
    Then the user click on " Panier "
    Then the user enters text "1" in the textbox "Qté"
    Then the user click on "Passer à la caisse"
    Then the user waits for text " Commande sécurisée " to be visible
    Then the user click on "Commander en tant qu’invité"
    Then the user waits for text " Sommaire du panier: " to be visible
    Then the user enters text "<firstName>" in the textbox "Prénom"
    Then the user enters text "<lastName>" in the textbox "Nom de famille"
    Then the user enters random email in the textbox "Adresse courriel"
    Then the user enters text "<phoneNum>" in the textbox "Téléphone"
    Then the signed in user selects pickup date
    Then the user click on "Continuer"
    Then the user waits for text "carte de crédit" to be visible
    Then the user switches to the frame "__zoid__card_sdk"
    Then the user enters french "Mastercard" card details
    Then the user switches to the parent frame
    Then the user enters french billing details for "Mastercard" card
    Then the user click on "Continuer"
    Then the user waits for text "Passer la commande" to be visible
    Then the user clicks on text "Passer la commande" at index "1"
    Then the user waits for text " Confirmation de commande " to be visible
    Then the user waits for text " Votre commande a bien été reçue. " to be visible
    Then the user validates if " Votre commande a bien été reçue. " text is visible
    Then the user validates if the text "Numéro de commande" is visible at index "1"
    Then the user validates if " RAMASSAGE EN MAGASIN: " text is visible

    Examples:
      | firstName | lastName    | phoneNum   | noOfProductabove10 | maxQuantity |
      | Testuser  | WebdriverIO | 6576756756 | 10 +               | 999         |