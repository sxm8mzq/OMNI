Feature: SignedIn Registered User BODFS Same Day Using Unsaved Payment Method In French

  Background: User launches url
    Given the user launches the url

  @e2e @regressionTest @bodfs @registeredUser @visaCard @unsavedPaymentMethod
  Scenario Outline: Registered user should able to buy a bodfs item with a unsaved payment method in french
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
    Then the user validates if " Salut John, Mon compte " text is visible
    Then the user checks if shipping addresses exists
    Then the user checks if cart is empty
    Then the user enters text sku in textbox with placeholder "Que cherchez-vous?"
    Then the user clicks on the "search" icon at index "1"
    Then the user waits for text "Ajouter au panier" to be visible
    Then the user add product to cart
    Then the user click on "Afficher le panier"
    Then the user waits for text "Mon Panier: " to be visible
    Then the user click on " Aujourd'hui dans les 3 heures "
    Then the user waits for text " Livraison dans les 3 heures : " to be visible
    Then the user click on " M1R 4E6 "
    Then the user enters text "<invalidPostalCode>" in textbox with placeholder "A1A 1A1"
    Then the user click on "Enregistrer"
    Then the user validates if " Veuillez entrer un code postal valide. " text is visible
    Then the user click on " Livraison à  "
    Then the user click on " Enregistrer pour plus  "
    Then the user validates if "0 article(s) " text is visible
    Then the user validates if " 1 article(s) " text is visible
    Then the user click on "Ajouter au panier"
    Then the user validates if " 0 article(s) " text is visible
    Then the user click on " Aujourd'hui dans les 3 heures "
    Then the user waits for text " Livraison dans les 3 heures : " to be visible
    Then the user validates the order summary table in french
    Then the user validates if "Politique de retour" text is visible
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
    Then the user waits for text "carte de crédit" to be visible
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
    Then the user validates if " Livraison express: " text is visible

    Examples:
      | email                       | password | postalCode | invalidPostalCode | firstName | lastName    | address            | city        | province | postalCode | phone      |
      | evangeline_heller@gmail.com | Test@123 | M1R 4E6    | ABC 123           | Testuser  | WebdriverIO | 428 Ellesmere Road | Scarborough | Ontario  | M1R 4E6    | 4704243224 |