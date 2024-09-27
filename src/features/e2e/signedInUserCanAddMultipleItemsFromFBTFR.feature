Feature: Verify SignedIn Registered User Can Add Multiple Items From FBT In French

  Background: User launches url
    Given the user launches the url

  @e2e @regressionTest @fbt @masterCard @mCycle @registeredUser
  Scenario Outline: User should able to add multiple items from fbt in french
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
    Then the user waits for text " Articles fréquemment achetés ensemble " to be visible
    Then the user scrolls to " Articles fréquemment achetés ensemble "
    Then the user validates if "Prix total:" text is visible
    Then the user validates if "Ajouter 3 articles au panier" text is visible
    Then the user validates if all frequently bought items checkboxes are checked and components are shown
    Then the user click on "Ajouter 3 articles au panier"
    Then the user waits for text "Ajouté au panier" to be visible
    Then the user click on "Afficher le panier"
    Then the user waits for text "Mon Panier: " to be visible
    Then the user clicks the webelement containing html tag "id" as "fulfillment_BOPIS_"
    Then the user waits for text " Ramassage en magasin : " to be visible
    Then the user click on "Passer à la caisse"
    Then the user waits for text " Commande sécurisée " to be visible
    Then the user validates if the delivery form is available
    Then the user enters text "<firstName>" in the textbox "Prénom"
    Then the user enters text "<lastName>" in the textbox "Nom de famille"
    Then the user enters text "<phoneNum>" in the textbox "Téléphone"
    Then the user enters text "<city>" in the textbox "Ville"
    Then the user enters value "<province>" in dropdown "Province"
    Then the user enters text "<postalCode>" in the textbox "Code postal"
    Then the user enters text "<address>" in textbox with placeholder "Commencez à saisir votre adresse ..."
    Then the user click on "Continuer"
    Then the user waits for text " Magasin pour le ramassage " to be visible
    Then the signed in user selects pickup date
    Then the user click on "Continuer"
    Then the user waits for text "Utiliser une carte-cadeau" to be visible
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
    Then the user validates if " EXPÉDITION STANDARD: " text is visible
    Then the user validates if " RAMASSAGE EN MAGASIN: " text is visible

    Examples:
      | email                     | password | firstName | lastName | address            | city        | province | phoneNum   | postalCode |
      | kaylee.ryan55@hotmail.com | Test@123 | John      | Doe      | 428 ellesmere road | Scarborough | Ontario  | 4704243224 | M1R 4E6    |