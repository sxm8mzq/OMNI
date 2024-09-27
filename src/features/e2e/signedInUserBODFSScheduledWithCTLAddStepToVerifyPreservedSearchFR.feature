Feature: SignedIn Registered User BODFS Scheduled With CTLP And Verify Preserved Search In French

  Background: User launches url
    Given the user launches the url

  @e2e @regressionTest @bodfs @registeredUser @amex @mCycle
  Scenario Outline: Registered user should able to buy a bodfs scheduled with ctlp and verify preserved search
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
    Then the user validates if placeholder with text "1000481251" is visible
    Then the user scrolls to "Les clients qui ont consulté cet article ont acheté"
    Then the user click on "Les clients qui ont consulté cet article ont acheté"
    Then the user presses keyboard key "Tab"
    Then the user presses keyboard key "Enter"
    Then the user waits for text "Ajouter au panier" to be visible
    Then the user go back on browser
    Then the user waits for text "Ajouter au panier" to be visible
    Then the user validates if placeholder with text "1000481251" is visible
    Then the user validates if " Vous voulez faire installer votre achat? " text is visible
    Then the user add product to cart
    Then the user validates if " Demande dinstallation " text is not visible
    Then the user click on "Afficher le panier"
    Then the user waits for text "Mon Panier: " to be visible
    Then the user clicks on text "Demain" at index "1"
    Then the user waits until the spinner is no longer visible
    Then the user validates if " Modifier la  " text is visible
    Then the user validates if "Me mettre en lien avec des Pros locaux" checkbox is not selected
    Then the user click on "Me mettre en lien avec des Pros locaux"
    Then the user waits until the spinner is no longer visible
    Then the user click on "Passer à la caisse"
    Then the user waits for text " Sommaire du panier: " to be visible
    Then the user validates if "Demande d’installation" text is visible
    Then the user validates if " Choisir l’option de livraison : " text is visible
    Then the user enters text "<firstName>" in the textbox "Prénom"
    Then the user enters text "<lastName>" in the textbox "Nom de famille"
    Then the user enters text "<phoneNum>" in the textbox "Téléphone"
    Then the user enters text "<city>" in the textbox "Ville"
    Then the user enters value "<province>" in dropdown "Province"
    Then the user enters text "<postalCode>" in the textbox "Code postal"
    Then the user enters text "<address>" in textbox with placeholder "Commencez à saisir votre adresse ..."
    Then the user click on "Continuer"
    Then the user waits for text "Utiliser une carte-cadeau" to be visible
    Then the user switches to the frame "__zoid__card_sdk"
    Then the user enters french "Amex" card details
    Then the user switches to the parent frame
    Then the user enters french billing details for "Amex" card
    Then the user click on "Continuer"
    Then the user waits for text "Passer la commande" to be visible
    Then the user clicks on text "Passer la commande" at index "1"
    Then the user waits for text " Confirmation de commande " to be visible
    Then the user waits for text " Votre commande a bien été reçue. " to be visible
    Then the user validates if " Votre commande a bien été reçue. " text is visible
    Then the user validates if the text "Numéro de commande" is visible at index "1"
    Then the user validates if " Livraison express: " text is visible
    Then the user validates if "DATE DE LIVRAISON PRÉVUE:" text is visible
    Then the user validates if " Nous vous appellerons ou vous enverrons un texto environ 30 minutes avant votre livraison. " text is visible
    Then the user validates if "Demandé: Pro local" text is visible

    Examples:
      | email                       | password | firstName | lastName    | address            | city        | province | phoneNum   | postalCode |
      | geovanni.walter90@gmail.com | Test@123 | Testuser  | WebdriverIO | 428 Ellesmere Road | Scarborough | Ontario  | 4704243224 | M1R 4E6    |