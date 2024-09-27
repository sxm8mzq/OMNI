Feature: SignedIn Registered User Add Multiple Items To Wishlist Add Selected Item To Cart Remove Wishlist And Checkout In French

  Background: User launches url
    Given the user launches the url

  @e2e @regressionTest @registeredUser @mCycle @visaCard
  Scenario Outline: SignedIn registered user should able to add multiple items to wishlist add selected item to cart remove wishlist and checkout in french
    Then the user enters text "7001" in textbox with placeholder "Postal Code, City, or Store Number"
    Then the user clicks on the "search" icon at index "2"
    Then the user waits for text "SCARBOROUGH #7001" to be visible
    Then the user click on "Select"
    Then the user click on "Français"
    Then the user click on " Mon compte / Ouvrir une session "
    Then the user waits for text "Adresse courriel" to be visible
    Then the user enters text "<email>" in the textbox "Adresse courriel"
    Then the user enters text "<password>" in the textbox "Mot de passe"
    Then the user click on "Ouvrir une session"
    Then the user validates if " Salut Andrea, Mon compte " text is visible
    Then the user checks if shipping addresses exists
    Then the user checks if cart is empty
    Then the user checks if wishlist is empty
    Then the user enters text "<sku1>" in textbox with placeholder "Que cherchez-vous?"
    Then the user clicks on the "search" icon at index "1"
    Then the user waits for text "Ajouter au panier" to be visible
    Then the user validates if the icon "heart-filled" at index "1" is not visible
    Then the user clicks on the "heart-hollow" icon at index "1"
    Then the user waits for text " Afficher la liste " to be visible
    Then the user clicks on the "hd-logo-fr" icon at index "1"
    Then the user presses keyboard key "Escape"
    Then the user enters text "<sku2>" in textbox with placeholder "Que cherchez-vous?"
    Then the user clicks on the "search" icon at index "1"
    Then the user waits for text "Ajouter au panier" to be visible
    Then the user validates if the icon "heart-filled" at index "1" is not visible
    Then the user clicks on the "heart-hollow" icon at index "1"
    Then the user waits for text " Afficher la liste " to be visible
    Then the user clicks on the "hd-logo-fr" icon at index "1"
    Then the user presses keyboard key "Escape"
    Then the user enters text "<sku3>" in textbox with placeholder "Que cherchez-vous?"
    Then the user clicks on the "search" icon at index "1"
    Then the user waits for text "Ajouter au panier" to be visible
    Then the user validates if the icon "heart-filled" at index "1" is not visible
    Then the user clicks on the "heart-hollow" icon at index "1"
    Then the user waits for text " Afficher la liste " to be visible
    Then the user click on " Afficher la liste "
    Then the user waits for text " RÉSUMÉ DE LA LISTE " to be visible
    Then the user clicks on text "Ajouter au panier" at index "3"
    Then the user validates if "Ajouté au panier" text is visible
    Then the user click on "Retour à la liste"
    Then the user clicks on the "trash" icon at index "1"
    Then the user waits for text "Êtes-vous certain(e) de vouloir retirer " to be visible
    Then the user click on "Supprimer"
    Then the user validates if "<sku1>" text is not visible
    Then the user clicks on the "trash" icon at index "3"
    Then the user waits for text "Êtes-vous certain(e) de vouloir retirer " to be visible
    Then the user click on "Supprimer"
    Then the user validates if "<sku3>" text is not visible
    Then the user click on " Panier "
    Then the user waits for text "Mon Panier: " to be visible
    Then the user click on "Passer à la caisse"
    Then the user waits for text " Commande sécurisée " to be visible
    Then the user validates if the delivery form is available
    Then the user enters text "<firstName>" in the textbox "Prénom"
    Then the user enters text "<lastName>" in the textbox "Nom de famille"
    Then the user enters text "<phone>" in the textbox "Téléphone"
    Then the user enters text "<city>" in the textbox "Ville"
    Then the user enters value "<province>" in dropdown "Province"
    Then the user enters text "<postalCode>" in the textbox "Code postal"
    Then the user enters text "<address>" in textbox with placeholder "Commencez à saisir votre adresse ..."
    Then the user click on "Continuer"
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
    Then the user validates if " EXPÉDITION STANDARD: " text is visible

    Examples:
      | email                           | password | sku1       | sku2       | sku3       | firstName | lastName | address            | city        | province | postalCode | phone      |
      | andreabouchhad3234322@gmail.com | Test@123 | 1001238365 | 1001226868 | 1000101252 | Andrea    | Bouchhad | 428 Ellesmere Road | Scarborough | Ontario  | M1R 4E6    | 4749543224 |