Feature: SignedIn Registered User Shops By Department Add Sku Checkout With Visa In French

  Background: User launches url
    Given the user launches the url

  @e2e @regressionTest @bopis @registeredUser @visaCard @mCycle
  Scenario Outline: Registered user should able to shop by department add sku checkout with visa in french
    Then the user enters text "7001" in textbox with placeholder "Postal Code, City, or Store Number"
    Then the user clicks on the "search" icon at index "2"
    Then the user waits for text "SCARBOROUGH #7001" to be visible
    Then the user click on "Select"
    Then the user click on "Français"
    Then the user click on " Mon compte / Ouvrir une session "
    Then the user waits for text "Adresse courriel" to be visible
    Then the user enters text "<email>" in the textbox "Adresse courriel"
    Then the user enters text "<password>" in the textbox "Mot de passe"
    Then the user waits for webelement "submit" with html attribute "type" to be visible
    Then the user click on "Ouvrir une session"
    Then the user validates if " Salut John, Mon compte " text is visible
    Then the user checks if cart is empty
    Then the user click on "Magasiner par rayon"
    Then the user waits for text "Salle de bain" to be visible
    Then the user click on "Salle de bain"
    Then the user waits for text "Cabines de douche et portes de cabine de douche" to be visible
    Then the user click on "Cabines de douche et portes de cabine de douche"
    Then the user waits for text "Portes de cabine de douche" to be visible
    Then the user click on "Portes de cabine de douche"
    Then the user presses keyboard key "Escape"
    Then the user validates if "Scarborough" text is visible
    Then the user clicks on the checkbox "En stock aujourd"
    Then the user waits for webelement "acl-spinner__spinner" with html attribute "class" not to be visible
    Then the user clicks on text "Nº d'article # " at index "2"
    Then the user waits for text "Ajouter au panier" to be visible
    Then the user add product to cart
    Then the user click on "Afficher le panier"
    Then the user waits for text "Mon Panier: " to be visible
    Then the user clicks the webelement containing html tag "id" as "fulfillment_BOPIS_"
    Then the user waits for text " Ramassage en magasin : " to be visible
    Then the user click on "Passer à la caisse"
    Then the user waits for text " Commande sécurisée " to be visible
    Then the user enters text "<phoneNum>" in the textbox " Téléphone "
    Then the signed in user selects pickup date
    Then the user waits for text "Utiliser une carte-cadeau" to be visible
    Then the user switches to the frame "__zoid__card_sdk"
    Then the user enters french "Visa" card details
    Then the user switches to the parent frame
    Then the user enters french billing details for "Visa" card
    Then the user click on "Continuer"
    Then the user waits for text "Passer la commande" to be visible
    Then the user clicks on text "Passer la commande" at index "1"
    Then the user waits for text " Confirmation de commande " to be visible
    Then the user waits for text " Votre commande a bien été reçue. " to be visible
    Then the user validates if " Votre commande a bien été reçue. " text is visible
    Then the user validates if the text "Numéro de commande" is visible at index "1"

    Examples:
      | email                         | password | phoneNum   |
      | hellen.gleichner7@hotmail.com | Test@123 | 4711243224 |