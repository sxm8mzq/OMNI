Feature: Verify guest user place order parts and service with paypal

Background: User launches url
           Given the user launches the url
             #Given the user launches the SAP url and login to SAP
 
  @e2e
  Scenario Outline: Guest User should able to verify place order parts and service with paypal
    Then the user enters text "9765" in textbox with placeholder "Postal Code, City, or Store Number"
    Then the user clicks on the webelement with html tag "title" as "Search"
    Then the user waits for webelement "hdca-store-list-item__column-store" with html attribute "class" to be visible
    Then the user click on "Select"
    Then the user enters text "<sku>" in textbox with placeholder "What can we help you find?"
    Then the user clicks on the webelement with html tag "class" as "acl-action-button"
    Then the user waits for webelement "hdca-product" with html attribute "class" to be visible
    Then the user add product to cart
    Then the user click on "View Cart"
    Then the user waits for webelement "acl-image__image" with html attribute "class" to be visible
    Then the user clicks the webelement containing html tag "id" as "fulfillment_BOPIS_"
    Then the user click on "Checkout Now"
    Then the user waits for text "Secure Checkout" to be visible
    Then the user click on "Checkout as Guest"
    Then the user waits for webelement "hdca-checkout-header__title" with html attribute "class" to be visible
    Then the user validates if the store pick up form is available
    Then the user enters text "<firstName>" in the textbox "First Name"
    Then the user enters text "<lastName>" in the textbox "Last Name"
    Then the user enters random email in the textbox "Email Address"
    Then the user enters text "<phone>" in the textbox " Phone Number "
    Then the user clicks on the element with html tag "padding" as "medium" at index "1"
    Then the user click on "Continue"
    Then the user waits for text "Credit Card" to be visible
    Then the user switches to the frame "__zoid__card_sdk"
    Then the user enters the "Mastercard" card details
    Then the user switches to the parent frame
    Then the user enters billing details for "Mastercard" card
    Then the user click on "Continue"
    Then the user waits for text "Place Order " to be visible
    ####Then the user waits for place order button to be visible
     Then the user clicks on text "Place Order" at index "2"
    Then the user waits for webelement "acl-container acl-container--theme-dark acl-p--small" with html attribute "class" to be visible
    Then the user validates if " Your order was successful. " text is visible
    Then the user validates if the webelement with html attribute "class" as "acl-col--12 acl-text-size--x-large" has text "Order Number"
    Then the user save created order number in json file

              # #     # # # # # # ----------------- Auth ---------------------
                  Then the user launches the SAP url and login to SAP
                  Then the user check the BOPIS order details with Tcode  /nva03    
                  Then the user do the authorization for BOSS order
              
          # #     # # # # # # ----------------- BOPIS delivery ---------
                  Then the user check BOPIS delivery and create if it is not created yet
  
       #        # # # # -----------------Picking------------------
                  
                Then the user go to picking for bopis /nYDSD0010
                Then the user verify picking request and DPR created /nva03

                ########## -----------------Release PGI-------------------

                Then the user do the Post Goods  Issue for the BOPIS Delivery
                Then the user go to va03 to verify GI status /nva03

#               #  ---------billing block removal------------------
                Then the user removes Billing Block /nsa38
                Then the user verify billing block removed /nva03
 
        # #   # ----------------F2 Invoice Steps-------------------
                Then the user process F2 Invoice Updated
                Then the user goto sa37 to verify job invoice job status /nsm37
                Then the user verify that the invoice is created /nva03
              ##  Then the user the process the invoice /nva03
                Then the user verify journal entry creation /nva03

    Examples:
    | firstName | lastName    | address       | city        | province | postalCode | phone | sku        |
    | Address   | WebdriverIO | 621 Rue Habel | Scarborough | Ontario  | M1R 4E6    | 4700148224 | 1000497098 |