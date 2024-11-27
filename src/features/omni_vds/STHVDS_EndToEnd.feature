Feature: Guest User Place Order With Master Card STH
 
  Background: User launches url
           #  Given the user launches the url
              Given the user launches the SAP url and login to SAP
 
  @e2e
    Scenario Outline: User should able to place order with master card sth
#       Then the user enters text "7001" in textbox with placeholder "Postal Code, City, or Store Number"
#     Then the user clicks on the webelement with html tag "title" as "Search"
#     Then the user waits for webelement "hdca-store-list-item__column-store" with html attribute "class" to be visible
#     Then the user click on "Select"
#     Then the user enters text sku in textbox with placeholder "What can we help you find?"
#     Then the user enters text "<sku>" in textbox with placeholder "What can we help you find?"
#     Then the user clicks on the webelement with html tag "class" as "acl-action-button"
#     Then the user waits for webelement "hdca-product__description" with html attribute "class" to be visible
#     Then the user add product to cart
#     Then the user waits for webelement "acl-modal__container acl-display--block" with html attribute "class" to be visible
#     Then the user click on "View Cart"
#     Then the user waits for webelement "acl-image__image" with html attribute "class" to be visible
# #     Then the user clicks the webelement containing html tag "id" as "fulfillment_SHIP_TO_HOME_"
#      Then the user clicks the webelement containing html tag "id" as "fulfillment_FDC_"
#     Then the user click on "Checkout Now"
#     Then the user waits for text "Secure Checkout" to be visible
#     Then the user click on "Checkout as Guest"
#     Then the user waits for webelement "hdca-checkout-header__title" with html attribute "class" to be visible
#     Then the user validates if "Delivery:" text is visible
#     Then the user enters text "<firstName>" in the textbox " First Name"
#     Then the user enters text "<lastName>" in the textbox " Last Name "
#     Then the user enters random email in the textbox " Email Address "
#     Then the user enters text "<phone>" in the textbox " Phone Number "
#     Then the user enters text "<city>" in the textbox " City"
#     Then the user enters value "<province>" in dropdown "Province"
#     Then the user enters text "<address>" in textbox with placeholder "Start typing your address..."
#     Then the user click on "Continue"
#     Then the user waits for text "Credit Card" to be visible
#     Then the user switches to the frame "__zoid__card_sdk"
#     Then the user enters the "Mastercard" card details
#     Then the user switches to the parent frame
#     Then the user enters billing details for "Mastercard" card
#     Then the user click on "Continue"
#     Then the user waits for text "Place Order " to be visible
#     Then the user clicks on text "Place Order" at index "2"
#     Then the user waits for webelement "acl-container acl-container--theme-dark acl-p--small" with html attribute "class" to be visible
#     Then the user validates if " Your order was successful. " text is visible
#     Then the user validates if the webelement with html attribute "class" as "acl-col--12 acl-text-size--x-large" has text "Order Number"
#      Then the user save created order number in json file
#       # Integration#
           
             # #     # # # # # # ----------------- Auth ---------------------
             ##### Then the user launches the SAP url and login to SAP
                Then the user check the zvds order details with Tcode /nva03    
                Then the user do the authorization for STH order
 
        # #     # -----------------PO Creation------------------
                Then the user generate IDOC for creating PO
                Then the user process the IDOC number to generate PO with Tcode /nBD87
                Then the user checks the PO with Tcode /nva03
             
        # #     # # # # # # ----------------- Delivery Creation---------
                Then the user go to generate IDOC number /nWE19
                Then the user process the IDOC number to generate OBD /nBD87
 
#      #        # # # # -----------------Picking /Goods Receipt-------------------
                
                Then the user go to verify GR /nva03
                Then the user check the Outbound Delivery /nva03
               #### Then the user go to verify Outbound Delivery /nva03
 
     #     -----------------Release PGI-------------------
               Then the user go to ZVDS OBD PGI for releasing the delivery /nsa38
                Then the user go to va03 to verify GD goods issue status /nva03
                       
        #  ---------billing block removal------------------
                Then the user removes Billing Block /nsa38
                Then the user verify billing block removed /nva02
 
        # #   # ----------------F2 Invoice Steps-------------------
                Then the user process F2 Invoice Updated
                Then the user goto sa37 to verify job invoice job status /nsm37
                Then the user verify that the invoice is created /nva03
              ##  Then the user the process the invoice /nva03
                # Then the user verify journal entry creation /nva03
    Examples:
      | firstName | lastName    | address       | city        | province | postalCode | phone   | userName | password | sku |
      | Address   | WebdriverIO | 621 Rue Habel | Scarborough | Ontario  | M1R 4E6    | 8944783456 | xxxxx  |xxxx | 1000686028 |