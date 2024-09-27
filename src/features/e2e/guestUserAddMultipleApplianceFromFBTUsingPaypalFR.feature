Feature: Guest User Add Multiple Appliance From FBT Using Paypal In French

  Background: User launches url
    Given the user launches the url

  @e2e @regressionTest @guestUser @paypal @appliance @fbt @mCycle @footerLinks
  Scenario Outline: Guest user should able to add multiple appliances from fbt using paypal card
    Then the user enters text "7001" in textbox with placeholder "Postal Code, City, or Store Number"
    Then the user clicks on the "search" icon at index "2"
    Then the user waits for text "SCARBOROUGH #7001" to be visible
    Then the user click on "Select"
    Then the user click on "Français"
    Then the user scrolls to "S'abonner"
    Then the user click on "S'abonner"
    Then the user waits for text " Abonnez-vous au programme d’envoi de courriels de Home Depot " to be visible
    Then the user enters text "<firstName>" in the textbox "Prénom"
    Then the user enters text "<lastName>" in the textbox "Nom de famille"
    Then the user enters text "<postalCode>" in the textbox "Code postal"
    Then the user enters random email in the textbox "Adresse Courriel"
    Then the user click on "Courriels de Home Depot"
    Then the user click on "Courriels du Club de jardinage"
    Then the user click on "Courriels Pro"
    Then the user clicks on the "S'abonner" button at index "1"
    Then the user waits for text " Merci de vous être abonné " to be visible
    Then the user enters text sku in textbox with placeholder "Que cherchez-vous?"
    Then the user clicks on the "search" icon at index "1"
    Then the user waits for text "Ajouter au panier" to be visible
    Then the user validates if " Livraison " text is visible
    Then the user validates if " Options de livraison pour le code postal " text is visible
    Then the user waits for text " Fréquemment réunis " to be visible
    Then the user presses keyboard key "PageDown"
    Then the user scrolls to " Fréquemment réunis "
    Then the user validates if "Prix total:" text is visible
    Then the user validates if "Vérifier la disponibilité" text is visible
    Then the user validates if all frequently bought items checkboxes are checked and components are shown
    Then the user click on "Vérifier la disponibilité"
    Then the user waits for text "Ajouter au panier" to be visible
    #Then the user clicks on text "Ajouter au panier" at index "9"
    Then the user clicks on the webelement with html tag "class" as "acl-button__label ng-star-inserted"
    Then the user waits until the spinner is no longer visible
    Then the user validates if "Afficher le panier" text is visible
    Then the user click on "Afficher le panier"
    Then the user waits for text "Mon Panier: " to be visible
    Then the user validates if "2 article(s) " text is visible
    Then the user validates if " Livraison d’électroménagers " text is visible
    Then the user click on "Passer à la caisse"
    Then the user waits for text " Commande sécurisée " to be visible
    Then the user click on "Commander en tant qu’invité"
    Then the user waits for text " Sommaire du panier: " to be visible
    Then the user enters text "<firstName>" in the textbox "Prénom"
    Then the user enters text "<lastName>" in the textbox "Nom de famille"
    Then the user enters random email in the textbox "Adresse courriel"
    Then the user enters text "<phoneNum>" in the textbox "Téléphone"
    Then the user enters text "<city>" in the textbox "Ville"
    Then the user enters value "<province>" in dropdown "Province"
    Then the user enters text "<postalCode>" in the textbox "Code postal"
    Then the user enters text "<address>" in textbox with placeholder "Commencez à saisir votre adresse ..."
    Then the user click on "Continuer"
    Then the user validates if "carte de crédit" text is visible
    Then the user clicks on the "paypal" icon at index "1"
    Then the user click on "Continuer avec"
    Then the user waits for text "Pay with PayPal" to be visible
    Then the user enters text "<paypalUserName>" in textbox with placeholder "Email or mobile number"
    Then the user click on "Next"
    Then the user enters text "<paypalPassword>" in textbox with placeholder "Password"
    Then the user click on "Log In"
    Then the user click on "Complete Purchase"
    Then the user waits for text "Adresse de facturation :" to be visible
    Then the user click on "Continuer"
    Then the user waits for text "Passer la commande" to be visible
    Then the user clicks on text "Passer la commande" at index "1"
    Then the user waits for text " Confirmation de commande " to be visible
    Then the user waits for text " Votre commande a bien été reçue. " to be visible
    Then the user validates if the text "Numéro de commande" is visible at index "1"
    Then the user validates if " LIVRAISON D’ÉLECTROMÉNAGERS: " text is visible

    Examples:
      | firstName | lastName | postalCode | address            | city        | province | phoneNum   | paypalUserName  | paypalPassword |
      | Clark     | Chen     | M1R 4E6    | 428 Ellesmere Road | Scarborough | Ontario  | 4704243296 | cabuyer2@thd.ca | 11111111       |