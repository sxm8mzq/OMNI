Feature: SignedIn User Can Add Place Appliance Order With Parts And Service With Mastercard In French

  Background: User launches url
    Given the user launches the url

  @e2e @regressionTest @mCycle @masterCard @registeredUser @appliance
  Scenario Outline: SignedIn registered user should be able to place appliance order with parts and service with mastercard
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
    Then the user validates if " Ajouter le service d’installation incluant les pièces " text is visible
    Then the user clicks on the checkbox " Ajouter le service d’installation incluant les pièces "
    Then the user add product to cart
    Then the user click on "Ajouter Plan de protection"
    Then the user click on "Afficher le panier"
    Then the user waits for text "Mon Panier: " to be visible
    Then the user click on "Supprimer"
    Then the user waits for text " Votre panier est vide. " to be visible
    Then the user clicks on the "search" icon at index "1"
    Then the user waits for text "Ajouter au panier" to be visible
    Then the user validates if " Ajouter le service d’installation incluant les pièces " text is visible
    Then the user clicks on the checkbox " Ajouter le service d’installation incluant les pièces "
    Then the user add product to cart
    Then the user click on "Ajouter Plan de protection"
    Then the user click on "Afficher le panier"
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
    Then the user validates if " LIVRAISON D’ÉLECTROMÉNAGERS: " text is visible

    Examples:
      | email            | password | postalCode | firstName | lastName    | address            | city        | province | postalCode | phone      |
      | einar3@yahoo.com | Test@123 | M1R 4E6    | John      | WebdriverIO | 428 Ellesmere Road | Scarborough | Ontario  | M1R 4E6    | 4704243224 |